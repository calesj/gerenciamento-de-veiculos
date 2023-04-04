<?php

namespace App\Http\Controllers;

use App\Form\FormValidation;
use Illuminate\Http\Request;
use App\Models\Defeito;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class DefeitoController extends Controller
{
    private $request;
    private $regras = [
        'carro_id' => 'required',
        'descricao' => 'required'
    ];
    private $message = ['message' => 'Desculpe, algo deu errado'];

    public function index()
    {
        try{
            $defeitos = Defeito::all();

            return response()->json($defeitos);
        } catch (\Exception $e) {
            return response()->json($this->message);
        }
    }

    public function show($id)
    {
        try{
            $defeito = Defeito::find($id);

            return response()->json($defeito);
        } catch (\Exception $e) {
            return response()->json($this->message);
        }
    }

    public function store(Request $request)
    {
        $validate = FormValidation::validar((array)$request, $this->regras);
        //se houver erros de validacao, retornara uma array com a chave errors. e suas respectivas mensagens
        if (!$validate) {
            return $validate;
        }

        // cria um ponto de restauração
        DB::beginTransaction();

        $modelo = $request->get('modelo');
        $fabricante = $request->get('fabricante');
        $ano = $request->get('ano');
        $preco = $request->get('preco');

        try {
            $defeito = new Defeito();
            $defeito->modelo = $modelo;
            $defeito->fabricante = $fabricante;
            $defeito->ano = $ano;
            $defeito->preco = $preco;
            $defeito->save();

            //confirma operação para o banco
            DB::commit();

            return response()->json(['message' => 'Oba, deu certo!']);

        } catch (\Exception $e) {

            // volta pro ponto de restauração
            DB::rollBack();

            return response()->json($this->message);
        }
    }

    public function update(Request $request, $id)
    {
        // verifica se existe um defeito no banco com esse id
        $defeito = Defeito::find($id);

        if(!$defeito) {
            return response()->json(['Recurso não encontrado'], 404);
        }

        // validando os dados
        $validate = FormValidation::validar((array)$request, $defeito);

        //se houver erros de validacao, retornara uma array com a chave errors. e suas respectivas mensagens
        if(!$validate) {
            return $validate;
        }

        // ponto de restauracao
        DB::beginTransaction();

        // update no banco
        $modelo = $request->get('modelo');
        $fabricante = $request->get('fabricante');
        $ano = $request->get('ano');
        $preco = $request->get('preco');

        try {
            $defeito->modelo = $modelo;
            $defeito->fabricante = $fabricante;
            $defeito->ano = $ano;
            $defeito->preco = $preco;
            $defeito->save();

            // confirma operacao no banco
            DB::commit();

            return response()->json(['message' => 'Item atualizado com sucesso']);

        }catch (Exception $e) {
            // volta para o ponto de restauracao
            DB::rollBack();

            return response()->json($this->message);
        }
    }

    public function delete($id)
    {
        // verifica se existe um defeito no banco com esse id
        $defeito = Defeito::find($id);
        if(!$defeito) {
            return response()->json(['message' => 'recurso não encontrado', 404]);
        }

        // cria um ponto de restauracao
        DB::beginTransaction();

        try {
            $defeito->detete();

            // confirma a transacao
            DB::commit();

            return response()->json(['message' => 'item deletado com sucesso!']);
        } catch (\Exception $e) {

            // volta para o ponto de restauracao
            DB::rollBack();

            return response()->json($this->message);
        }
    }
}
