<?php

namespace App\Http\Controllers;

use App\Form\FormValidation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Defeito;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class DefeitoController extends Controller
{
    private array $rules = [
        'carro_id' => 'required',
        'descricao' => 'required'
    ];

    public function index()
    {
        try {
            $defeitos = Defeito::all();

            if (!$defeitos) {
                return response()->json(['message' => 'recurso não encontrado'],404);
            }

            return response()->json($defeitos);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function show($id)
    {
        try {
            $defeito = Defeito::find($id);

            if (!$defeito) {
                return response()->json(['message' => 'recurso não encontrado'],404);
            }
            return response()->json($defeito);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function store(Request $request)
    {
        //criando um ponto de restauração
        DB::beginTransaction();

        try {
            //validação dos inputs
            $validate = FormValidation::validar($request->all(), $this->rules);

            if ($validate !== true) {
                return $validate;
            }

            $carro_id = $request->get('carro_id');
            $descricao = $request->get('descricao');

            $defeito = new Defeito();
            $defeito->carro_id = $carro_id;
            $defeito->descricao = $descricao;

            $defeito->save();
            //confirma a transação para o banco de dados
            DB::commit();
            return response()->json(['message' => 'Oba, deu certo!'], 201);

        } catch (QueryException $e) {
            //restaurará o banco de dados para o ponto de restauração criado antes dessa operação
            DB::rollBack();

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }


    public function update(Request $request, $id)
    {
        // ponto de restauracao
        DB::beginTransaction();

        try {
            // verifica se existe um defeito no banco com esse id
            $defeito = Defeito::find($id);

            if (!$defeito) {
                return response()->json(['Recurso não encontrado'], 404);
            }

            // validando os dados
            $validate = FormValidation::validar($request->all(), $this->rules);

            //se houver erros de validacao, retornara uma array com a chave errors. e suas respectivas mensagens
            if ($validate !== true) {
                return $validate;
            }

            // update no banco
            $carro_id = $request->get('carro_id');
            $descricao = $request->get('descricao');


            $defeito->carro_id = $carro_id;
            $defeito->descricao = $descricao;
            $defeito->save();

            // confirma operacao no banco
            DB::commit();

            return response()->json(['message' => 'Item atualizado com sucesso']);

        } catch (Exception $e) {
            // volta para o ponto de restauracao
            DB::rollBack();

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }

    public function delete($id)
    {
        // verifica se existe um defeito no banco com esse id
        $defeito = Defeito::find($id);
        if (!$defeito) {
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

            return response()->json(['message' => 'Desculpe, algo deu errado']);
        }
    }
}
