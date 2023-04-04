<?php

namespace App\Http\Controllers;

use App\Form\FormValidation;
use Illuminate\Http\Request;
use App\Models\Carro;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class CarroController extends Controller
{
    private $request;
    private $regras = [
        'modelo' => 'required',
        'fabricante',
        'ano',
        'preco'
        ];
    private $message = ['message' => 'Desculpe, algo deu errado'];

    public function index()
    {
        try{
            $carros = Carro::all();

            return response()->json($carros);
        } catch (\Exception $e) {
            return response()->json($this->message);
        }
    }

    public function show($id)
    {
        try{
        $carro = Carro::with('defeitos')->find($id);

        return response()->json($carro);
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
            $carro = new Carro();
            $carro->modelo = $modelo;
            $carro->fabricante = $fabricante;
            $carro->ano = $ano;
            $carro->preco = $preco;
            $carro->save();

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
        // verifica se existe um carro no banco com esse id
        $carro = Carro::find($id);

        if(!$carro) {
            return response()->json(['Recurso não encontrado'], 404);
        }

        // validando os dados
        $validate = FormValidation::validar((array)$request, $carro);

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
            $carro->modelo = $modelo;
            $carro->fabricante = $fabricante;
            $carro->ano = $ano;
            $carro->preco = $preco;
            $carro->save();

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
        // verifica se existe um carro no banco com esse id
        $carro = Carro::find($id);
        if(!$carro) {
            return response()->json(['message' => 'recurso não encontrado', 404]);
        }

        // cria um ponto de restauracao
        DB::beginTransaction();

        try {
            $carro->detete();

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
